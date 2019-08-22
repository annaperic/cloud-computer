import {compose} from 'react-apollo';
import {Form, Icon, Input, Button, Row, Col, notification} from 'antd';

/** libs **/
import {withAuthClient} from '../lib/with-auth-client';

/** styles **/
const styles = {
    image: {
        maxWidth: '300px',
    },
    registerForm: {
        maxWidth: '300px',
        minWidth: '300px',
        margin: '10% auto',
    },
    registerFormForgot: {
        float: 'right'
    },
    registerFormButton: {
        width: '100%',
        backgroundColor: 'rgb(77,29,119)',
        border: 'none'
    },
    registerHeading: {
        padding: '50px 31% 30px 31%',

    },

};

const Register = (props) => {
    const {getFieldDecorator} = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, {username, password}) => {
            if (!err) {
                try {
                    await props.authAPI.post('/auth/register', {
                        username,
                        password
                    });
                    window.location = '/login';
                } catch (e) {
                    if(e.message === 'duplicate key value violates unique constraint "user_username_key"') {
                        notification.error({
                            message: 'Oh no! Something went wrong',
                            description:
                                'Username has already been taken',
                        });
                    }
                }
            }
        });
    };
    return (
        <Row>
            <Col style={{width: '100%', margin: '0', overflowY: 'hidden'}} offset={8} span={8}>
                <Form onSubmit={handleSubmit} style={styles.registerForm}>
                    <img
                        style={styles.image}
                        src="https://avatars3.githubusercontent.com/u/49678748?s=400&amp;u=23aa86cbd4f8d9a5b2c2a8cc744c4d364903a772"
                        alt="Cloud Computer"/>
                    <h1 style={styles.registerHeading}>Register</h1>
                    <p style={{ padding: '0', margin: '0' }}>Create a username</p>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please enter your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder ="Username"
                            />,
                        )}
                    </Form.Item>
                    <p style={{ padding: '0', margin: '0' }}>Create a password</p>
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
                        <Button type="primary"
                                htmlType="submit"
                                style={styles.registerFormButton}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};


/** add HOC's need for the component **/
export default compose(
    Form.create({name: 'register'}),
    withAuthClient
)(Register);
