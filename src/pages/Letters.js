import {OverlayTrigger, Button, Popover, Image, Row, Col } from 'react-bootstrap';
import imgPath from '../assets/pdf.svg'

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`

const fourInRow = (array) => {
    const iter = (arr, acc) => {
        if (arr.length <= 4 ) return [...acc, arr]
        return iter(arr.slice(4), [...acc, arr.slice(0,4)])
    }
    return iter(array, [])
}

const Letters = () => {
    return (
        <div className='m-5 pt-5' style={{borderTop:"dotted .5px"}}>
            {fourInRow([1,2,3,4,5]).map((e) => (
                <Row key={e} className="d-flex mb-5" >
                    {e.map(el =>
                        <Col className="m-4">
                            <div style={{width:"10vw"}}>
                                <OverlayTrigger
                    trigger="click"
                    key={el}
                    placement='right-start'
                    overlay={
                        <Popover id={`popover-positioned`}>
                        <Popover.Header as="h3">{`Краткое содержание`}</Popover.Header>
                        <Popover.Body>
                            {text}
                            <Button variant="secondary" size="sm" className="mt-1">Скачать документ</Button>
                        </Popover.Body>
                        </Popover>
                    }
                    >
                        <div>
                            <Button variant="outline-light">
                                <div style={{color:"black"}}>Pogghghposer gghghghghdfdfdf</div>
                                <br />
                                <Image src={imgPath}
                                width="160"
                                height="160"
                                />
                            </Button>
                        </div>
                    
                    </OverlayTrigger>
                            </div>
            
        </Col>
                    )}
                </Row>
        
        

      ))}
        </div>
    );
};

export default Letters;