import { For, type Component } from "solid-js"
import { createForm } from '@tanstack/solid-form'
import { Button, Form } from "solid-bootstrap"
import './styles/LoginForm.css'

export const Register: Component = () => {
    const form = createForm(() => ({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => console.log(value)
    }))

    return (
        <div class="login-wrapper">
            <h1 class="text-header">Login</h1>
            <Form onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
                class="login-form"
            >
                <Form.Group
                    class="login-input"
                >
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter your email"
                        value={form.state.values.email}
                        onInput={(e) => form.setFieldValue('email', e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group
                    class="login-input"
                >
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="Password" placeholder="Enter your password"
                        value={form.state.values.password}
                        onInput={(e) => form.setFieldValue('password', e.currentTarget.value)}
                    />
                </Form.Group>
                <Button type="submit"
                    variant="primary"
                    class="login-input"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}