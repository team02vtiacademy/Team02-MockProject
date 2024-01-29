import React from "react";
import {
    Button,
    InputGroupAddon,
    Row,
    Col,
} from "reactstrap";
import { FastField, Form, Formik } from "formik";
import { TextInput } from "../../custom_/Text";
import { selectSearch } from "../../redux/selectors/GroupSelector";
import { connect } from "react-redux";


const CustomSearch = (props) => {

    return (
        <Formik
            key={Date.parse(new Date())}    // fix bug: not-re-render when initialValues changing
            enableReinitialize
            initialValues={
                {
                    search: props.search ? props.search : ''
                }
            }
            onSubmit={
                values => {
                    props.onSearch(values.search);
                }
            }
        >

            <Form>
                <Row style={{ alignItems: "center" }}>
                    <Col >
                        <FastField
                            type="text"
                            bsSize="lg"
                            name="search"
                            placeholder="Tìm kiếm ..."
                            component={TextInput}
                        />
                    </Col>
                    <Col xs="auto">
                        <div className="input-group-append" addonType="append" color="primary" >
                            <Button type='submit'>Search</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Formik >
    );
}

const mapGlobalStateToProps = state => {
    return {
        search: selectSearch(state),
    };
};

export default connect(mapGlobalStateToProps)(CustomSearch);