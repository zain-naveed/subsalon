import React, { useState, useEffect, Suspense } from "react";
import AllApplicants from "./AllApplicants";
import ListPagination from "../../Shared/Components/Pagination/ListPagination";
// import Data from "./Shared/Data.json";
// import Data from "./Shared/TableData.json";

import { Spinner } from "react-bootstrap";
import { vectorMan, SearchIcons, Searchicon } from "./../../Assets/index";
import { AllGetApiApplicants } from '../../Shared/Services/applicantsApis';
import { useSelector } from 'react-redux';
import { toastMessage } from "../../Shared";


// import "../MyJob.css";

const ApplicantPosts = (props) => {

  const { user } = useSelector(state => state.root);
  let saloonId = user?.user?.saloon._id;
  const [posts, setPosts] = useState([]);
  const [searchElement, setSearchElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0);

  
  const getAllApplicants = () => {
    const paginate = pageNumber => setCurrentPage(pageNumber);
    let query = `?limit=${10}&page=${(currentPage - 1)}`;
    setLoader(true)
    AllGetApiApplicants(saloonId, query)
      .then(({ data: { data } }) => {
        
        setPosts(data.applicant)
        setTotalDoc(data?.doc)
        setLoader(false)

      })
      .catch((e) => {
        toastMessage("error", e);
      }).finally(() => setLoader(false));
  }




  useEffect(() => {
    getAllApplicants();
  }, [search, currentPage]);

  let indexOfLastPost = currentPage * TotalDoc;
  const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? ((currentPage-1) + 10):currentPage > 1 ? ((currentPage-1) + 10):1
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):10
  
  // Get current posts
  // let indexOfLastPost = currentPage * TotalDoc;
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
  // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (search) => {
    setSearch(search);

  }
  return (
    <div className="text-center">
      <div className='divForSearch'>
        <div style={{ position: "relative" }}>
          <img className='SearchIcon' src={Searchicon} />
          <input className='JobIpt' placeholder='Search for Items' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      {loader ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (

        <>
          <AllApplicants
            posts={posts}
            setPosts={setPosts}
            handleSearch={handleSearch}
          />
          <ListPagination
            indexOfLastPost={indexOfLastPost}
            indexOfFirstPost={indexOfFirstPost}
            postsPerPage={postsPerPage}
            totalPosts={TotalDoc}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default ApplicantPosts;
