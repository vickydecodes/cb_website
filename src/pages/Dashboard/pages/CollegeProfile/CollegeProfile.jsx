import React from "react";
import "./CollegeProfile.css";
import { FaPencil } from "react-icons/fa6";
import DetailsTab from "../../components/DetailsTab/DetailsTab";
import BannerBoard from "../../components/BannerBoard/BannerBoard";

export default function CollegeProfile() {
  return (
    <div className="collegeprofilepage">
      <BannerBoard />
      <div className="details_collegeprofile row d-flex g-0 p-0 mt-5">
        <div className="col-md-8 p-3">
          <DetailsTab
            heading={"College website"}
            content={"htps://www.citchennai.edu.in/"}
          />
          <DetailsTab
            heading={"College address"}
            content={
              "Sarathy Nagar, Kundrathur, Chennai, Malayambakkam, Tamil Nadu 600069"
            }
          />
          <DetailsTab heading={"City and State"} content={"Salem, Tamilnadu"} />
          <DetailsTab
            heading={"College Contact Number"}
            content={"91 9629881800"}
          />
          <DetailsTab
            heading={"About This College"}
            content={
              "Chennai Institute of Technology is an industry-connected autonomous institute, and is a co-educational engineering college located at Kundrathur, Chennai, Tamil Nadu, India. It was established in 2010 by the Parthasarathy Seeniammal Educational Trust."
            }
          />
          <DetailsTab
            heading={"Social Medias"}
            isSocialMedia={true}
            content={{
              instagram: "https://instagram.com/college",
              facebook: "https://facebook.com/college",
              linkedin: "",
            }}
          />
        </div>
        <div className="col-md-4 px-4 justify-content-around align-items-center d-flex flex-column">
          <div className="card card_status border-success">
            <div className="card-body text-success d-flex justify-content-center align-items-center">Status: Active</div>
          </div>
          <div className="card admin_card shadow mt-2">
            <div className="card-body">
              <div className="card-title d-flex justify-content-center align-items-center">
                Admin Profile
              </div>
              <DetailsTab heading={"Admin Name"} content={"PSS Srinivasan"} />
              <DetailsTab heading={"Designation"} content={"Principal"} />
              <DetailsTab
                heading={"Admin Mail"}
                content={"principal@kiot@gmail.com"}
              />
              <DetailsTab heading={"Admin Mobile"} content={"+91 9638521478"} />
            </div>
          </div>
          <button className="editbutton_collegeprofile">Edit Profile <FaPencil/></button>
        </div>
      </div>
    </div>
  );
}
