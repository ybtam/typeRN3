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

export const updateUserMutation = gql`
    mutation($user:UserInput!){
        updateUser(user:$user){
            firstName
            lastName
            email
            phone
        }
    }
`;

export const refreshTokenMutation = gql`
    mutation{
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

export const createTaskMutation = gql`
    mutation($id: Float!, $title: String!){
        createTask(data:{id:$id, title:$title})
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

export const createOrderMutation = gql`
    mutation{
        createOrder{
            id
        }
    }
`;

export const addProductToOrderMutation = gql`
    mutation($orderId: Float!, $productId: Float!, $quantity: Float!){
      addProductToOrder(data:{orderId:$orderId, productId: $productId, quantity: $quantity})
    }
`;

export const setCustomerToOrderMutation = gql`
    mutation($orderId: Float!, $companyId: Float!){
      setCustomerToOrder(data:{orderId:$orderId, companyId: $companyId})
    }
`;

export const createCategoryMutation = gql`
    mutation($category:CategoryInput!) {
      createCategory(category: $category){
        id
        name
        description
      }
    }
`;