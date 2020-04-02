import {gql} from "@apollo/client";

export const changePasswordMutation = gql`
    mutation($old_password: String!, $new_password: String!) {
        changePassword(
            passwords: {
                password: $old_password,
                new_password: $new_password
            }
        )
    }
`;

export const logInMutation = gql`
    mutation($email: String!, $password: String!) {
        login(
            user:{
                email:$email,
                password: $password
            }
        ){
            email
        }
    }
`;

export const signUpMutation = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        register(
            user: {
                firstName: $firstName,
                lastName: $lastName
                email:$email,
                password: $password
            }
        ){
            name
        }
    }
`;

export const refreshTokenMutation = gql`
    mutation {
      refreshToken
    }
`;

export const createCompanyMutation = gql`
    mutation ($name: String!, $nip: String!){
        createCompany(company:{name:$name, nip:$nip})
    }
`;

export const createProjectMutation = gql`
    mutation($name:String!){
        createProject(project:{name:$name}){
            id
            name
        }
    }
`;

export const checkInMutation = gql`
    mutation {
      checkIn{
        id
        createAt
      }
    }
`;

export const checkOutMutation = gql`
    mutation{
      checkOut{
        id
        minutes_worked
        createAt
      }
    }
`;

export const setTaskStatusMutation = gql`
    mutation($id: Float!){
        setTaskStatus(task:{id: $id})
    }
`;