import React, { useState, useEffect, Suspense } from "react";
import Posts from "./Shared/Posts";
import ListPagination from "../../../Shared/Components/Pagination/ListPagination";
// import Data from "./Shared/Data.json";
// import Data from "./Shared/TableData.json";
import Data from "./Shared/Applied.json";
import { Spinner } from "react-bootstrap";
import { vectorMan, SearchIcons, Searchicon } from "./../../../Assets/index";
// import "../MyJob.css";
import { getAllApliedJobs } from "../../../Shared/Services";
import {
  getMyFav,
  getFavAllProvider,
} from "../../../Shared/Services/myFavouriteServices";
import OwnerFavsTab from "../OwnerFavrout/OwnerFavsTab";

const Closed = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchElement, setSearchElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [removePage,setremovePage] = useState(false);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [TotalDoc, setTotalDoc] = useState(0);

  const MyFavs = () => {
    !search && setLoader(true);
    let query = `?limit=${10}&page=${currentPage - 1}${
      search ? "&search=" + search : ""
    }`;
    if (props?.owneerFavs) {
      getFavAllProvider(query)
        .then(({ data: { data } }) => {
          
          setTotalDoc(data?.doc);
          setPosts(data?.favourites);
        })
        .catch((err) => {})
        .finally(() => setLoader(false));
    } else {
      getMyFav(query)
        .then(({ data: { data } }) => {
          setTotalDoc(data?.doc);
          setPosts(data?.fav);
        })
        .catch((err) => {})
        .finally(() => setLoader(false));
    }
  };
  
  useEffect(() => {
    MyFavs();
  }, [search, currentPage]);

  // Get current posts
  let indexOfLastPost = currentPage * TotalDoc;
  const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage-1) + 10):1
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  indexOfLastPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):10
  
  // const indexOfFirstPost = indexOfLastPost - TotalDoc;
  // const indexOfFirstPost = (currentPage > 1 && (currentPage) * 10) > TotalDoc ? TotalDoc:currentPage > 1 ? ((currentPage) * 10):1
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // indexOfLastPost = indexOfLastPost > TotalDoc ? TotalDoc : indexOfLastPost;
  // // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (search) => {
    setSearch(search);
  };
  useEffect(()=>{
    if(currentPage > 1 && !posts.length && removePage){
      MyFavs();
      setCurrentPage(currentPage-1)
      setremovePage(false)
    }
  })
  
  return (
    <div className="text-center">
      <div className="divForSearch">
        <div style={{ position: "relative" }}>
          <img className="SearchIcon" src={Searchicon} />
          <input
            className="JobIpt"
            placeholder="Search for Items"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {loader ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {props?.owneerFavs ? (
            <OwnerFavsTab
              ownerFav={props?.owneerFavs}
              posts={posts}
              setPosts={setPosts}
              handleSearch={handleSearch}
              title={"Closed"}
              TotalDoc={TotalDoc}
              setTotalDoc={setTotalDoc}
              favSaloonup
              check
              indexOfLastPost={indexOfLastPost}
              indexOfFirstPost={indexOfFirstPost}
              currentPage={currentPage}
              setremovePage={setremovePage}
            />
          ) : (
            <Posts
              ownerFav={props?.owneerFavs}
              posts={posts}
              setPosts={setPosts}
              handleSearch={handleSearch}
              TotalDoc={TotalDoc}
              setTotalDoc={setTotalDoc}
              title={"Closed"}
              indexOfLastPost={indexOfLastPost}
            indexOfFirstPost={indexOfFirstPost}
            currentPage={currentPage}
            setremovePage={setremovePage}
            />
          )}
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
      )}
    </div>
  );
};

export default Closed;
