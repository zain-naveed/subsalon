import React, { useState, useEffect } from 'react';
import DetailPosts from './../Shared/DetailPost';
import ListPagination from './../../../Shared/Components/Pagination/ListPagination';
// import Data from "./Shared/Data.json";
import Data from "./../Shared/JobData.json";

import { useParams } from "react-router-dom";
import { toastMessage, getAllApplicant } from '../../../Shared';


const ApplicantsListing = ({ setTotalCount }) => {
  let params = useParams();

  const [applicantList, setApplicantList] = useState(true)
  const [posts, setPosts] = useState([]);
  const [searchElement, setSearchElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // const handleSearch = (search) => {

  //   // 
  //   if (search === "") {

  //   } else {
  //     let temp = Data.filter(o => o.roles.toLowerCase().includes(search) || o.status.toLowerCase().includes(search) || o.date_posted.toLowerCase().includes(search) || o.due_date.toLowerCase().includes(search) || o.job_type.toLowerCase().includes(search));
  //     
  //   }
  // }


  useEffect(() => {



    getApplicantsForJob()
  }, [currentPage]);

  const getApplicantsForJob = () => {

    getAllApplicant(params.id).then(({ data: { data } }) => {
      setTotalDoc(data?.doc)
      setPosts(data?.applicant);
      setTotalCount(data?.doc)
    }).catch((err) => {
      toastMessage("error", err?.response?.data?.message)
    }).finally(() => setLoader(false))
  }


  return (
    <>
      <DetailPosts
        posts={currentPosts}
        // handleSearch={handleSearch}
        title={"Closed"}
        setPosts={setPosts}

        check
      />
      <ListPagination
        indexOfLastPost={indexOfLastPost}
        indexOfFirstPost={indexOfFirstPost}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};

export default ApplicantsListing;
