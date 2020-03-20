import React from 'react'
import IntRange from '../helpers/IntRange'
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';


class Pagination extends React.Component {

    constructor(props) {
      super(props);
       const { totalRecords , pageLimit , pageNeighbours  } = props;
   
      this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 20;
      this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

      // pageNeighbours can be: 0, 1 or 2
      this.pageNeighbours = typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
        console.log(this.totalRecords)
      this.totalPages = Math.ceil(this.totalRecords / this.pageLimit); 
  
      this.state = { currentPage: 1 };
    }
    componentDidMount(){
        this.gotoPage(1)
    }
     gotoPage=(page)=>{
        const { onPageChanged  } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));
    
        const paginationData = {
          currentPage,
          totalPages: this.totalPages,
          pageLimit: this.pageLimit,
          totalRecords: this.totalRecords
        };
    
        this.setState({ currentPage }, () => onPageChanged(paginationData));
    }
    handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
      }
    
      handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage  - 1);
      }
    
      handleMoveRight = evt => {
        evt.preventDefault();
        const step=this.state.currentPage  + 1
        this.gotoPage(this.state.currentPage +  1);
      }
    fetchPageNumbers = () => {

        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;
    
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
    
          const startPage = Math.max(2, currentPage - pageNeighbours);
          const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    
          let pages = IntRange(startPage, endPage);
    
          /**
           * hasLeftSpill: has hidden pages to the left
           * hasRightSpill: has hidden pages to the right
           * spillOffset: number of hidden pages either to the left or to the right
           */
          const hasLeftSpill = startPage > 2;
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = IntRange(startPage - spillOffset, startPage - 1);
              pages = [LEFT_PAGE, ...extraPages, ...pages];
              break;
            }
    
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = IntRange(endPage + 1, endPage + spillOffset);
              pages = [...pages, ...extraPages, RIGHT_PAGE];
              break;
            }
    
            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
              break;
            }
          }
    
          return [1, ...pages, totalPages];
    
        }
    
        return IntRange(1, totalPages);
    
      }
    render(){
        const { totalRecords , pageLimit , pageNeighbours  } = this.props;
        console.log(this.pageNeighbours)
        if (!this.totalRecords || this.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages=this.fetchPageNumbers()
        console.log(currentPage)
        return(
            <>
        <div aria-label="Countries Pagination">
        <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ this.totalPages }</span>
                </span>
          <ul className="pagination justify-center">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <button className="page-link"  aria-label="Previous" onClick={this.handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <button className="page-link" aria-label="Next" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              );

              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <button className="page-link"  onClick={ this.handleClick(page) }>{ page }</button>
                </li>
              );

            }) }

          </ul>
        </div>
            </>
        )
    }
  }
  export default Pagination;