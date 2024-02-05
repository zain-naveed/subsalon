import React, { useState, useEffect } from 'react';
import Posts from './Shared/Posts';
import ListPagination from '../../../Shared/Components/Pagination/ListPagination';
import './../JobListings.css';
// import Data from "./Shared/Data.json";
import Data from "./Shared/ClosedData.json";
import { getAllCloseJob, toastMessage } from '../../../Shared';

const Closed = ({ setCloseJobCount }) => {
  const [posts, setPosts] = useState([]);
  const [searchElement, setSearchElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0)

 // Get current posts
 let indexOfLastPost = currentPage * TotalDoc;
 const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage-1) + 10):1
 const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):10

  // Get current posts
  // let indexOfLastPost = currentPage * TotalDoc;
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // indexOfLastPost = (indexOfLastPost > TotalDoc) ? TotalDoc : indexOfLastPost;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = (search) => {

    setSearch(search)
  }


  useEffect(() => {
    // const fetchPosts = async () => {
    // setPosts(Data)
    // };
    getCloseJobs()
    // fetchPosts();
  }, [search, currentPage]);

  const getCloseJobs = () => {
    !search && setLoader(true)
    let query = `?limit=${10}&page=${(currentPage - 1)}${search ? '&search=' + search : ""}`
    

    getAllCloseJob(query).then(({ data: { data } }) => {
      
      setTotalDoc(data?.doc)
      // setPosts(Data);
      setPosts(data?.closedJob);
      setCloseJobCount(data?.doc)
    }).catch((err) => {
      toastMessage("error", err?.response?.data?.message)
    }).finally(() => setLoader(false))
  }


  return (
    <>
      {/* <Posts
        posts={currentPosts} handleSearch={handleSearch}
        title={"Closed"}
        check
        setPosts={setPosts}
      /> */}
         <Posts
            posts={posts}
            handleSearch={handleSearch}
            title={"Closed"}
            setPosts={setPosts}
          />
      {/* <ListPagination
        indexOfLastPost={indexOfLastPost}
        indexOfFirstPost={indexOfFirstPost}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
        <ListPagination
            indexOfLastPost={indexOfLastPost}
            indexOfFirstPost={indexOfFirstPost}
            postsPerPage={postsPerPage}
            totalPosts={TotalDoc}
            paginate={paginate}
            posts={posts}
            setCurrentPage={setCurrentPage}
          />
    </>
  );
};

export default Closed;
