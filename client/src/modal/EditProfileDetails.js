import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailsProfile } from "../actions/userAction";
import { Oval } from "react-loader-spinner";

export default function EditProfileDetails({
  editDetails,
  setEditDetails,
  profile,
}) {
  const dispatch = useDispatch();

  const profileDetailsUpdate = useSelector(
    (state) => state.profileDetailsUpdate
  );

  const { loading, error } = profileDetailsUpdate;

  useEffect(() => {
    if (error) {
      notify(error);
    }
  }, [error]);

  const userInfos = {
    bio: profile?.details?.bio ? profile?.details?.bio : "",
    first_name: profile?.first_name ? profile?.first_name : "",
    last_name: profile?.last_name ? profile?.last_name : "",
    password: "",
    confirmPassword: "",
    bYear: profile?.bYear ? profile?.bYear : new Date().getFullYear(),
    bMonth: profile?.bMonth ? profile?.bMonth : new Date().getMonth() + 1,
    bDay: profile?.bDay ? profile?.bDay : new Date().getDate(),
    address: profile?.details?.address ? profile?.details?.address : "",
    country: profile?.details?.country ? profile?.details?.country : "",
    relationship: profile?.details?.relationship
      ? profile?.details?.relationship
      : "",
    highSchool: profile?.details?.highSchool
      ? profile?.details?.highSchool
      : "",
    college: profile?.details?.college ? profile?.details?.college : "",
    university: profile?.details?.university
      ? profile?.details?.university
      : "",
    job: profile?.details?.job ? profile?.details?.job : "",
    workplace: profile?.details?.workplace ? profile?.details?.workplace : "",
    homeNumber: profile?.details?.homeNumber
      ? profile?.details?.homeNumber
      : "",
    mobileNumber: profile?.details?.mobileNumber
      ? profile?.details?.mobileNumber
      : "",
    instagram: profile?.details?.instagram ? profile?.details?.instagram : "",
    linkedin: profile?.details?.linkedin ? profile?.details?.linkedin : "",
  };
  const notify = (message) => toast.error(message);
  const [user, setUser] = useState(userInfos);

  const {
    bio,
    first_name,
    last_name,
    password,
    confirmPassword,
    bYear,
    bMonth,
    bDay,
    address,
    country,
    relationship,
    highSchool,
    college,
    university,
    job,
    workplace,
    homeNumber,
    mobileNumber,
    instagram,
    linkedin,
  } = user;

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      notify("Password does not match!");
    }
    dispatch(
      updateDetailsProfile({
        bio,
        first_name,
        last_name,
        password,
        bYear,
        bMonth,
        bDay,
        address,
        country,
        relationship,
        highSchool,
        college,
        university,
        job,
        workplace,
        homeNumber,
        mobileNumber,
        instagram,
        linkedin,
      })
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="snackbar"
      />
      <Modal
        size="md"
        open={editDetails}
        onClose={() => setEditDetails(false)}
        className="createPostModal"
      >
        <div className="createPostModal__header">
          <h5>Update details</h5>
        </div>
        <div className="editProfileDetails">
          <Formik
            enableReinitialize
            initialValues={{
              bio,
              first_name,
              last_name,
              password,
              confirmPassword,
              bYear,
              bMonth,
              bDay,
              address,
              country,
              relationship,
              highSchool,
              college,
              university,
              job,
              workplace,
              homeNumber,
              mobileNumber,
              instagram,
              linkedin,
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="editProfileDetails__inputBox1">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      placeholder="Add Bio"
                      name="bio"
                      value={bio === "Add your bio" ? "" : bio}
                      onChange={handleUpdateChange}
                    />
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        placeholder="First Name"
                        name="first_name"
                        value={first_name}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        placeholder="Last Name"
                        name="last_name"
                        value={last_name}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox3">
                    <div className="editProfileDetails__input">
                      <label htmlFor="bDay">Day</label>
                      <select
                        name="bDay"
                        onChange={handleUpdateChange}
                        value={bDay}
                      >
                        {days.map((day, i) => {
                          return (
                            <option value={day} key={i}>
                              {day}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="bMonth">Month</label>
                      <select
                        name="bMonth"
                        value={bMonth}
                        onChange={handleUpdateChange}
                      >
                        {months.map((month, i) => {
                          return (
                            <option value={month} key={i}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="bYear">Year</label>
                      <select
                        name="bYear"
                        value={bYear}
                        onChange={handleUpdateChange}
                      >
                        {years.map((year, i) => {
                          return (
                            <option value={year} key={i}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox1">
                    <label htmlFor="address">Address</label>
                    <textarea
                      placeholder="Enter address"
                      type="text"
                      name="address"
                      value={address === "Add your address" ? "" : address
                      }
                      onChange={handleUpdateChange}
                    />
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="country">Country</label>
                      <input
                        placeholder="Enter Country"
                        type="text"
                        name="country"
                        value={country === "Add your country" ? "" : country}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="relationship">Relationship</label>
                      <select
                        name="relationship"
                        value={relationship}
                        onChange={handleUpdateChange}
                      >
                        <option hidden value="" selected disabled>
                          Select relationship
                        </option>
                        <option value="Single">Single</option>
                        <option value="In a relationship">
                          In a relationship
                        </option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox3">
                    <div className="editProfileDetails__input">
                      <label htmlFor="highSchool">High School</label>
                      <input
                        placeholder="Enter High school"
                        type="text"
                        name="highSchool"
                        value={highSchool === "Add your high school" ? "" : highSchool}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="college">College</label>
                      <input
                        placeholder="Enter college"
                        type="text"
                        name="college"
                        value={college === "Add your college" ? "" : college}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="university">University</label>
                      <input
                        placeholder="Enter university"
                        type="text"
                        name="university"
                        value={university === "Add your university" ? "" : university}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="job">Job</label>
                      <input
                        placeholder="Enter job position"
                        type="text"
                        name="job"
                        value={job === "Add your job" ? "" : job}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="workplace">WorkPlace</label>
                      <input
                        placeholder="Enter workplace"
                        type="text"
                        name="workplace"
                        value={workplace === "Add your workplace" ? "" : workplace}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="homeNumber">Home number</label>
                      <input
                        placeholder="Enter home number"
                        type="text"
                        name="homeNumber"
                        value={homeNumber === "Add your home number" ? "" : homeNumber}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="mobileNumber">Mobile number</label>
                      <input
                        placeholder="Enter mobile number"
                        type="text"
                        name="mobileNumber"
                        value={mobileNumber === "Add your mobile number" ? "" : mobileNumber}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="instagram">Instagram</label>
                      <input
                        placeholder="Instagram username"
                        type="text"
                        name="instagram"
                        value={instagram === "Add your instagram" ? "" : instagram}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="">Linkedin</label>
                      <input
                        placeholder="Linkedin username"
                        type="text"
                        name="linkedin"
                        value={linkedin === "Add your linkedin" ? "" : linkedin}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__inputBox2">
                    <div className="editProfileDetails__input">
                      <label htmlFor="new_password">New Password</label>
                      <input
                        placeholder="New password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleUpdateChange}
                      />
                    </div>
                    <div className="editProfileDetails__input">
                      <label htmlFor="confirm_password">
                        Confirm New Password
                      </label>
                      <input
                        placeholder="Confirm new password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleUpdateChange}
                      />
                    </div>
                  </div>
                  <div className="editProfileDetails__btn">
                    <button type="submit" disabled={loading}>
                      {loading ? (
                        <Oval
                          visible={true}
                          height="20"
                          width="20"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
