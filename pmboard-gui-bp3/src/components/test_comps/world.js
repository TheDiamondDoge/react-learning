import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import LoadingCard from "../loading-card/loading-card";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {InputGroup, TextArea, HTMLTable} from "@blueprintjs/core";
import FormInput from "./form-input/form-input";
import testHOC from "../../util/formikHealthHOC";

export default class World extends React.Component {
    customInputComponent = ({field, form: {touched, errors}, ...props}) => (
        <div>
            <TextArea type="text" {...field} {...props} />
            {touched[field.name] &&
            errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </div>
    );

    render() {
        const {test, testPassed, onClick1, onClick2} = this.props;
        const Compp = testHOC();
        return (
            <>
                <LoadingCard/>
                <NavLink exact to="/pws">
                    <button>PWS</button>
                </NavLink>
                <div>
                    {test} <br/>
                    {testPassed} <br/>
                    <button onClick={onClick1}>1</button>
                    <button onClick={onClick2}>2</button>
                </div>
                <input onChange={(x) => (console.log(x.target.value))}/>
                <br/>

                <Formik
                    onSubmit={(e, b) => {
                        console.log(e);
                        console.log(b);
                    }
                    }
                    initialValues={{date: new Date(), semail: {test: "heheh@mail.ru"}}}
                    render={
                        () => (
                            <Form>
                                <HTMLTable>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Field type="date" name="date" component={FormInput}/>
                                            <ErrorMessage name="email" component="div"/>
                                        </td>
                                        <td>
                                            <Field type="email" name="semail.test"/>
                                            <ErrorMessage name="semail.test" component="div"/>
                                        </td>
                                        <td>
                                            <button type="submit">Submit</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </HTMLTable>
                            </Form>
                        )
                    }
                />
                <Compp/>
            </>
        );
    }
};

World.propTypes = {
    test: PropTypes.bool,
    testPassed: PropTypes.bool,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func,
};
