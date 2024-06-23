
const Pagination = ({ page, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${page === number ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  