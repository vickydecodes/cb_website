import React from "react";
import "./CollegeProfile.css";
import { FaPencil } from "react-icons/fa6";
import DetailsTab from "../../components/DetailsTab/DetailsTab";
import BannerBoard from "../../components/BannerBoard/BannerBoard";

export default function CollegeProfile({
  handleEditButtonForCollegeProfile,
  user,
}) {
  console.log("user for collegeprofile", user);
  return (
    <div className="collegeprofilepage">
      <BannerBoard college_logo={user.college_logo} college_banner={user.college_banner} college_name={user.college_name}/>
      <div className="details_collegeprofile row d-flex g-0 p-0 mt-5">
        <div className="col-md-8 p-3">
          <DetailsTab
            heading={"College website"}
            content={user.college_website}
          />
          <DetailsTab
            heading={"College address"}
            content={user.college_address}
          />
          <DetailsTab
            heading={"City and State"}
            content={`${user.city},${user.state}`}
          />
          <DetailsTab
            heading={"College Contact Number"}
            content={user.contact_number}
          />
          <DetailsTab
            heading={"About This College"}
            content={user.college_about}
          />
          <DetailsTab
            heading={"Social Medias"}
            isSocialMedia={true}
            content={{
              instagram: user.instagram,
              facebook: user.facebook,
              linkedin: user.linkedin,
            }}
          />
        </div>
        <div className="col-md-4 px-4 justify-content-around align-items-center d-flex flex-column">
          <div className="card card_status border-success">
            <div className="card-body text-success d-flex justify-content-center align-items-center">
              Status: {user.status}
            </div>
          </div>
          <div className="card admin_card shadow my-3">
            <div className="card-body">
              <div className="card-title d-flex justify-content-center align-items-center">
                Admin Profile
              </div>
              <DetailsTab heading={"Admin Name"} content={user.admin_name} />
              <DetailsTab heading={"Designation"} content={user.designation} />
              <DetailsTab
                heading={"Admin Mail"}
                content={user.admin_mail}
              />
              <DetailsTab heading={"Admin Mobile"} content={user.admin_mobile} />
            </div>
          </div>
          <button
            className="editbutton_collegeprofile"
            onClick={handleEditButtonForCollegeProfile}
          >
            Edit Profile <FaPencil />
          </button>
        </div>
      </div>
    </div>
  );
}
