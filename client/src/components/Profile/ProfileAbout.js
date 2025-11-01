import React from "react";
import { Link } from "react-router-dom";

export default function ProfileAbout({ profile, visitor }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="profileAbout">
      <div className="profileAbout__about">
        {profile && profile.details ? (
          <>
            <div className="profileAbout__about-overview">
              <h5>Overview</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-user"></i>
                  </div>

                  <span>
                    {profile.first_name} {profile.last_name}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>

                  <span>
                    {profile.bDay} {months[profile.bMonth - 1]} {profile.bYear}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>

                  <span>
                    {profile.details.address}, {profile.details.country}
                  </span>
                </li>

                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-grin-hearts"></i>
                  </div>

                  <span>
                    {profile.details.relationship ? (
                      profile.details.relationship
                    ) : visitor ? (
                      "No relationship info to show"
                    ) : (
                      <span>Add relationship</span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="profileAbout__about-overview">
              <h5>Work and Education</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-school"></i>
                  </div>
                  <span>{profile.details.highSchool}</span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <span>{profile.details.college}</span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-university"></i>
                  </div>
                  <span>{profile.details.university}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <span>{profile.details.workplace}</span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <span>{profile.details.job}</span>
                </li>
              </ul>
            </div>
            <div className="profileAbout__about-overview">
              <h5>Contact Info</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <span>{profile.details.mobileNumber}</span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <span>{profile.details.homeNumber}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="far fa-envelope"></i>
                  </div>
                  <span>{profile.email}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fab fa-instagram"></i>
                  </div>
                  <span>{profile.details.instagram}</span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <span>{profile.details.linkedin}</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          "Not found user information"
        )}
      </div>
      <div className="profileAbout__extra">
        {" "}
        <div className="profileAbout__about-view">
          <span>Bio</span>
          <p>
            {profile?.details?.bio ? (
              profile?.details?.bio
            ) : visitor ? (
              "No bio info to show"
            ) : (
              <Link>Add bio</Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
