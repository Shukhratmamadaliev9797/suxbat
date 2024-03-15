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
        {profile && profile.details ? (
          <>
            <div className="profileAbout__about-overview">
              <h5>Overview</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-user"></i>
                  </div>

                  <span>
                    {profile.first_name} {profile.last_name}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-calendar-alt"></i>
                  </div>

                  <span>
                    {profile.bDay} {months[profile.bMonth - 1]} {profile.bYear}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>

                  <span>
                    {profile.details.address || profile.details.address ? (
                      `Lives in ${profile.details.address}, ${profile.details.country}`
                    ) : visitor ? (
                      "No address info to show"
                    ) : (
                      <Link>Add address</Link>
                    )}
                  </span>
                </li>

                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-grin-hearts"></i>
                  </div>

                  <span>
                    {profile.details.relationship ? (
                      profile.details.relationship
                    ) : visitor ? (
                      "No relationship info to show"
                    ) : (
                      <Link>Add relationship</Link>
                    )}
                  </span>
                </li>
              </ul>
            </div>{" "}
            <div className="profileAbout__about-overview">
              <h5>Work and Education</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-school"></i>
                  </div>
                  <span>
                    {profile.details.highSchool ? (
                      profile.details.highSchool
                    ) : visitor ? (
                      "No high school info to show"
                    ) : (
                      <Link>Add school information</Link>
                    )}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <span>
                    {profile.details.college ? (
                      profile.details.college
                    ) : visitor ? (
                      "No college info to show"
                    ) : (
                      <Link>Add college information</Link>
                    )}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-university"></i>
                  </div>
                  <span>
                    {profile.details.university ? (
                      profile.details.university
                    ) : visitor ? (
                      "No college info to show"
                    ) : (
                      <Link>Add University information</Link>
                    )}
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-building"></i>
                  </div>
                  <span>
                    {profile.details.workplace ? (
                      profile.details.workplace
                    ) : visitor ? (
                      "No workplace info to show"
                    ) : (
                      <Link>Add workplace information</Link>
                    )}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-briefcase"></i>
                  </div>
                  <span>
                    {profile.details.job ? (
                      profile.details.job
                    ) : visitor ? (
                      "No job info to show"
                    ) : (
                      <Link>Add job information</Link>
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="profileAbout__about-overview">
              <h5>Contact Info</h5>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <span>
                    {profile.details.mobileNum ? (
                      profile.details.mobileNum
                    ) : visitor ? (
                      "No mobile number to show"
                    ) : (
                      <Link>Add mobile number</Link>
                    )}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <span>
                    {profile.details.homeNum ? (
                      profile.details.homeNum
                    ) : visitor ? (
                      "No home number to show"
                    ) : (
                      <Link>Add home number</Link>
                    )}
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="far fa-envelope"></i>
                  </div>
                  <span>
                    {profile.email ? (
                      profile.email
                    ) : visitor ? (
                      "No email address to show"
                    ) : (
                      <Link>Add email address</Link>
                    )}
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fab fa-instagram"></i>
                  </div>
                  <span>
                    {profile.details.instagram ? (
                      profile.details.instagram
                    ) : visitor ? (
                      "No instagram account to show"
                    ) : (
                      <Link>Add instagram account</Link>
                    )}
                  </span>
                </li>
                <li>
                  <div className="profileAbout__about-icon">
                    <i class="fab fa-linkedin-in"></i>
                  </div>
                  <span>
                    {profile.details.linkedin ? (
                      profile.details.linkedin
                    ) : visitor ? (
                      "No linkedin account to show"
                    ) : (
                      <Link>Add linkedin account</Link>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          "Not found user information"
        )}
      </div>
      <div className="profileAbout__extra"></div>
    </div>
  );
}
