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
      width: '300px',
      paddingBottom: '100px'
    },
    loginForm: {
        maxWidth: '300px',
        minWidth: '300px',
        margin: '5% auto',
        border: 'solid 2px pink',
        textAlign: 'center'
    },
    loginFormForgot: {
        float: 'right',
    },
    loginFormButton: {
        width: '100%',

    },
    loginGoogle: {
        width: '100%',
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(250, 250, 250)',
        border: 'none'
    },
    loginGithub: {
        width: '100%',
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(250, 250, 250)',
        border: 'none'
    },
    formItem: {

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
                        message: 'Something went wrong',
                        description: e.message
                    });
                }
            }
        });
    };
    return (
        <Row>
            <Col style={{width: '100%', margin: '0', overflowY: 'hidden'}} offset={8} span={8}>
                <Form onSubmit={handleSubmit} style={styles.loginForm}>
                    <img
                        style={styles.image}
                        src="https://avatars3.githubusercontent.com/u/49678748?s=400&amp;u=23aa86cbd4f8d9a5b2c2a8cc744c4d364903a772"
                        alt="Cloud Computer"/>
                    <Form.Item>
                        <Button icon="google" style={styles.loginGoogle} onClick={() => window.location = process.env.GOOGLE_REDIRECT}>
                            Sign in with Google
                        </Button>
                        <Button icon="github" style={styles.loginGithub} onClick={() => window.location = process.env.GITHUB_REDIRECT}>
                            Sign in with Github
                        </Button>
                    </Form.Item>
                    <Form.Item style={styles.formItem}>
                        <p>OR</p>
                        <p>Sign in with Email</p>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please enter your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator ('password', {
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
                        <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                            Log in
                        </Button>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                        <Checkbox style={{float: 'left'}}>Remember me</Checkbox>)}
                        <a style={styles.loginFormForgot} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item>
                         <Link href="/register">
                             <a style={{ color: 'rgb(112,40,204)' }}>Register now!</a>
                         </Link>
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
