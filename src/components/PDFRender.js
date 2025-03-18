import { useState } from "react";
import { Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFFile from "../assets/техчасть.pdf"

pdfjs.GlobalWorkerOptions.workerSrc= `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function PDFComponent() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({numPages}) =>{
        setNumPages(numPages)
    };
    
    const goToPrevPage = () => 
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () => 
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    return (
        <div className="d-flex position-fixed ms-4" style={{zIndex:"100"}}>
            
            <div style={{border:"1px solid grey", boxShadow: "6px 6px 2px 1px rgba(120, 120, 120, .2"}} className="ms-5">
            <Document
                file={PDFFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} scale={1.3}/>
            </Document>
            </div>
            
            <nav className="align-self-center ms-5">
                <Button variant="outline-secondary" className="mb-3" onClick={goToNextPage} style={{display:"block", width:"4vw", height:"8vw"}}>вперед</Button>
                <Button variant="outline-secondary" onClick={goToPrevPage} style={{display:"block", width:"4vw", height:"8vw"}}>назад</Button>
                <br></br>
                <p style={{textAlign:"center"}}>{pageNumber} / {numPages}</p>
            </nav>
        </div>
        
    )
}


export default PDFComponent;