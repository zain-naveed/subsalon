import { SignalCellularNoSimOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

const ListPagination = ({ postsPerPage, totalPosts, paginate, indexOfLastPost, indexOfFirstPost, check, posts, setCurrentPage }) => {
  const pageNumbers = [];
  const [bool, setBool] = useState(false)

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // setTimeout(
  //   posts && posts != undefined && posts.length == 0 ?
  //     setCurrentPage(pageNumbers[pageNumbers.length - 1]) : 1
  //   , 9000)


  return (
    <nav>
      <div className='paginationShow'>
        {/* <div className='paginationShowDiv'>{indexOfFirstPost + 1}-{indexOfLastPost} of {totalPosts} Results</div> */}
        <div className='paginationShowDiv'>{indexOfFirstPost}-{indexOfLastPost} of {totalPosts} Results</div>
        <div>
          <ul className='pagination pages'>
            {totalPosts > 10 && pageNumbers.map(number => (
              <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} className='page-link'>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ListPagination;
