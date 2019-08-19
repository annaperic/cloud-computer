import { Button, Checkbox, Col, Form, Icon, Input, notification, Row } from 'antd';
import Link from 'next/link';
import { compose } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';
import { withAuthClient } from '../lib/with-auth-client';

/** libs **/
/** constants **/
/** styles **/
const styles = {
    image : {
      width: '300px'
    },
    loginForm: {
        maxWidth: '300px',
        margin: '12% auto'
    },
    loginFormForgot: {
        float: 'right'
    },
    loginFormButton: {
        width: '100%'
    },
    loginGoogle: {
        width: '100%'
    },
    loginGithub: {
        width: '100%'
    }
};


const Login = (props) => {
    const {getFieldDecorator} = props.form;
    const {authAPI} = props;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, {username, password}) => {
            if (!err) {
                console.log('Received values of form: ', {username, password});
                try {
                    const result = await authAPI.post('/auth/login', {
                        username,
                        password
                    });
                    localStorage.setItem(AUTH_TOKEN,result.token);
                    window.location = '/';
                } catch (e) {
                    notification.error({
                        message: 'Oh no! Something went wrong :/',
                        description: e.message
                    });
                }
            }
        });
    };
    return (
        <Row>
            <Col offset={8} span={8}>
                <Form onSubmit={handleSubmit} style={styles.loginForm}>
                    <img
                        style={styles.image}
                        src="https://avatars3.githubusercontent.com/u/49678748?s=400&amp;u=23aa86cbd4f8d9a5b2c2a8cc744c4d364903a772"
                        alt="Cloud Computer"/>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please enter your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please enter your password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button icon="google" style={styles.loginGoogle} onClick={()=>window.location = process.env.GOOGLE_REDIRECT}>
                            Sign in with Google
                        </Button>
                        <Button icon="github" style={styles.loginGithub} onClick={()=>window.location = process.env.GITHUB_REDIRECT}>
                            Sign in with Github
                        </Button>
                        <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                            Log in
                        </Button>
                        Or <Link href="/register"><a>Register now!</a></Link>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a style={styles.loginFormForgot} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};


/** add HOC's need for the component **/
export default compose(
    Form.create({name: 'login'}),
    withAuthClient
)(Login);
