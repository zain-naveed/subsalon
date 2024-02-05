import React, { useEffect } from "react";
import OwnerNavigation from "../Shared/Components/Navbar/OwnerNavigation";
import SearchNavigation from "../Shared/Components/Navbar/searchNavigation";
import FooterMain from "../Shared/Components/MainFooter/FooterMain";
function Layout(props) {
  useEffect(() => {

    document.title = props.title + " | Subsalon";
  }, []);
  // 

  return (
    <>
      {props?.isClientHeader ? (
        <SearchNavigation />
      ) : props?.isOwner ? (
        <OwnerNavigation />
      ) : (
        ""
      )}
      {/* #8080801f */}
      <div style={{ minHeight: "100vh" }}>
        <props.component />
      </div>
      {props?.isClientHeader ? (
        <FooterMain />
      ) : props?.isOwner ? (
        <FooterMain />
      ) : (
        ""
      )}
    </>
  );
}

export default Layout;
