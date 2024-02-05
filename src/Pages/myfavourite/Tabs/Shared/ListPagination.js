import React from 'react';

const ListPagination = ({ postsPerPage, totalPosts, paginate, indexOfLastPost, indexOfFirstPost }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className='paginationShow'>
        <div className='paginationShowDiv'>{indexOfFirstPost + 1}-{indexOfLastPost} of {totalPosts} Results</div>
        <div>
          <ul className='pagination pages'>
            {pageNumbers.map(number => (
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
