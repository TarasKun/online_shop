import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {deviceStore} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data))
        fetchBrands().then(data => deviceStore.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(deviceStore.selectedType.id, deviceStore.selectedBrand.id, deviceStore.page, 2).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }, [deviceStore.page, deviceStore.selectedType, deviceStore.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;