import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updaetProfileSuccess } from "../../redux/user-slice";
import { useNavigate } from "react-router-dom";
export default function EditAccount({
  
  handleCloseModal,
  openModel,
}) {
  
  const [username, sestUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPass,setNewPass]  = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const [coverPreview, setCoverPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    sestUsername(currentUser.rest.username);
    setEmail(currentUser.rest.email);
  }, [currentUser]);
  console.log(currentUser);

  const nav = useNavigate();

  const dispatch = useDispatch();

  const submitData = async (e) => {
    e.preventDefault();
    console.log('profile',profileImg)
    console.log('cover',coverImg)
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append('newPass',newPass)
    formData.append('confirmPass',confirmPass)

    if (coverImg) {
      formData.append("coverImg", coverImg);
    }
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }
    setLoading(true);
    try {
      const { data } = await axios.put("/api/users/update-profile", formData);
      if (data.success == false) {
        setLoading(false);
        toast.error(data.message);
        return;
      }

      toast.success("Account Updaetd Success");
      dispatch(updaetProfileSuccess(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error(error);
    }

    sestUsername("");
    setEmail("");
    setPassword("");
    setNewPass('')
    setConfirmPass('')
    setCoverImg(null);
    setProfileImg(null);

    setCoverPreview(null);
    setProfilePreview(null);

    handleCloseModal();
  };
  const handleCoverChange = (e) => {
    const coverPhoto = e.target.files[0];
    if (coverPhoto) {
      setCoverImg(coverPhoto);
      setCoverPreview(URL.createObjectURL(coverPhoto));
    }
  };
  const handleProfileChange = (e) => {
    const profilePhoto = e.target.files[0];
    if (profilePhoto) {
      setProfileImg(profilePhoto);
      setProfilePreview(URL.createObjectURL(profilePhoto));
    }
  };
  return (
    <div>
      <Modal show={openModel} size="lg" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={submitData} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Your Account
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Username" value="Username" />
              </div>
              <TextInput
                id="Username"
                placeholder="Username"
                onChange={(event) => sestUsername(event.target.value)}
                defaultValue={currentUser.rest.username}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="email" />
              </div>
              <TextInput
                id="email"
                defaultValue={currentUser.rest.email}
                placeholder="name@company.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex items-center  gap-3 justify-between">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="oldPass" value="Old Password" />
                </div>
                <TextInput
                  id="oldPass"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Old Password"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPass" value="New password" />
                </div>
                <TextInput
                  id="newPass"
                  onChange={(e) => setNewPass(e.target.value)}
                  type="password"
                  placeholder="New Password"
                />
              </div>
            </div>
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm" value="Confirm password" />
                </div>
                <TextInput
                  id="confirm"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cover" value="Cover Image" />
              </div>
              <TextInput id="cover" type="file" onChange={handleCoverChange} />
              {coverPreview && (
                <div className="w-[120px] h-[120px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={coverPreview}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="profile" value="Profile Picture" />
              </div>
              <TextInput
                id="profile"
                type="file"
                onChange={handleProfileChange}
              />
              {profilePreview && (
                <div className="w-[120px] h-[120px] bg-red-900">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={profilePreview}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner />
                    <span className="ml-3">Updating Your Account ...</span>
                  </>
                ) : (
                  "Update Account"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
