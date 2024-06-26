import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";
import { app } from "../Firebase.jsx";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../Redux/user/userSlice.jsx";
const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // console.log(fileUploadPercentage);
  // console.log(file);
  //  console.log(formData);
  // console.log(fileUploadError);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUserAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const showAllListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      showListingsError(true);
    }
  };
  const handleListingDelete =async(listingId) => {
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:"DELETE"
      })
      const data = await res.json()
      if(data.success === false) {
        console.log(data.message)
        return
      }
      setUserListings((prev) =>prev.filter((listing) => listing._id !== listingId))

    }catch(error){
      console.log(error)
    }
  }
  const handleUpdateListing = () => {
    //
  }
   
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="avatar.png"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Uploading..</span>
          ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileUploadPercentage}%`}</span>
          ) : fileUploadPercentage === 100 ? (
            <span className="text-green-700">
              Image Succesfully Uploaded...
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username..."
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleFormChange}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="E-mail..."
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleFormChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleFormChange}
          defaultValue={currentUser.password}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {isLoading ? "Loading" : "Update"}
        </button>
        <Link
          className="bg-blue-300 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={deleteUserAccount}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <button onClick={showAllListings} className="text-green-700 w-full">
        Show listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error in showing Lists" : ""}
      </p>

      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => (
          <div
            key={listing._id}
            className="border rounded-lg p-3 flex justify-between items-center gap-4"
          >
            <Link to={`/listings/${listing._id}`}>
              <img
                className="h-16 w-16 object-contain rounded-lg"
                src={listing.imageUrls[0]}
                alt="cover image"
              />
            </Link>
            <Link
              className="flex-1 text-slate-700 font-semibold hover:underline truncate"
              to={`/listings/${listing._id}`}
            >
              <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button onClick ={handleUpdateListing} className="text-blue-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        ))}
        </div>}
        
    </div>
  );
};

export default Profile;
