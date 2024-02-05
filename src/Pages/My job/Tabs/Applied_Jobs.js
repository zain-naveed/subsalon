import React, { useState, useEffect, Suspense } from "react";
import Posts from "./Shared/Posts";
import ListPagination from "../../../Shared/Components/Pagination/ListPagination";
// import Data from "./Shared/Data.json";
// import Data from "./Shared/TableData.json";
import { Spinner } from "react-bootstrap";
import { vectorMan, SearchIcons, Searchicon } from "./../../../Assets/index";
import "../MyJob.css";
import { getAllApliedJobs } from "../../../Shared/Services";
const Closed = () => {
  const [posts, setPosts] = useState([]);
  const [searchElement, setSearchElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0)



  let indexOfLastPost = currentPage * TotalDoc;
  const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? ((currentPage-1) + 10):currentPage > 1 ? ((currentPage-1) + 10):1
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):10
  

  // Get current posts
  // let indexOfLastPost = currentPage * TotalDoc;
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost
  // Change page
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (search) => {
    setSearch(search);

    // 
    // if (search === "") {

    // } else {
    //   let temp = Data.filter(o => o.saloon_name.toLowerCase().includes(search) || o.role.toLowerCase().includes(search) || o.date_request.toLowerCase().includes(search) || o.job_type.toLowerCase().includes(search) || o.salary.toLowerCase().includes(search) || o.date_applied.toLowerCase().includes(search) || o.job_status.toLowerCase().includes(search));
    // }
  };

  useEffect(() => {
    getApliedJobs();
  }, [search, currentPage]);
  const getApliedJobs = () => {
    !search && setLoader(true)
    let query = `?limit=${10}&page=${(currentPage - 1)}${search ? '&search=' + search : ""}`
    getAllApliedJobs(query)
      .then(({ data: { data } }) => {
        setTotalDoc(data?.doc)
        setPosts(data?.applied);

      })
      .catch((err) => {
        
      }).finally(() => setLoader(false))
  };


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
          <Posts
            posts={posts}
            handleSearch={handleSearch}
            title={"Closed"}
            currentPage={currentPage}
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

export default Closed;
