import { Pagination as AntPagination } from 'antd';

const Pagination = ({total, currentPage, pageSize, onPageChange})=>{
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, total);
    return (
        <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AntPagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={onPageChange}
                showSizeChanger={false}
                showTotal={( total )=>(
                    <span style={{ position: 'absolute', left:350 }}>
                        Trang {currentPage} của {Math.ceil(total/pageSize)}
                    </span> 
                )}                
                pageSizeOptions={['5']}  
                    itemRender={(current, type, originalElement) => {
                    if (type === 'prev') { return <a>«</a>;}
                    if (type === 'next') { return <a>»</a>;}
                    return originalElement;
                }}
            size="default"
            showLessItems/>
            <span>
                Hiển thị {startIndex} - {endIndex} của {total}
            </span>
        </div>
    )
}
export default Pagination;

