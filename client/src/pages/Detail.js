import React from "react";
import {Col, Row, Container} from "../components/Grid";

function Detail(){
    return (<Container flued>
        <Row>
            <Col size="md-12">

            </Col>
        </Row>
        <Row>
            <Col size="md-10 md-offset-1">
                Book goes here
            </Col>
        </Row>
        <Row>
            <Col size="md-2">
                Back to home
            </Col>
        </Row>
    </Container>)
}

export default Detail;