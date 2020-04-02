import {gql} from "@apollo/client";

export const categoriesQuery = gql`
    {
      categories{
        id
        name
        description
      }
    }
`;

export const categoryQuery = gql`
    query($id: Float!){
      category(category:{id: $id}){
        products{
            id
            code
            description
            category{
              id
              name
            }
            nowPrice{
              price
            }
        }
      }
    }
`;

export const productsQuery = gql`
    {
      products{
        id
        code
        description
        category{
          id
          name
        }
        nowPrice{
          price
        }
      }
    }
`;

export const productQuery = gql`
    query($code: String!){
      product(product:{code:$code}){
        id
        description
        category{
          name
        }
        allPrices{
          id
          price
          createAt
        }
        nowPrice{
            id
        }
      }
    }
`;

export const projectsQuery = gql`{
    myProjects{
        id
        name
        noTasks
        noTasksCompleted
    }
}`;

export const project_query = gql`
query($id: Float!){
  project(project:{id: $id}){
    tasks{
      id
      title
      completed
    }
  }
}
`;

export const usersQuery = gql`
    {
        users{
            id,
            name,
            email,
        }
    }
`;

export const userQuery = gql`
    query($id: Float!) {
        user(id: $id){
            firstName
            lastName
            phone
        }
    }
`;

export const meQuery = gql`
    {
        me{
            id,
            firstName,
            lastName,
            name,
            email,
            phone
        }
    }
`;

export const companies_query = gql`
{
  companies{
    id
    name
    nip
  }
}
`;

export const company_query = gql`
query($id:Float!){
  company(company:{id: $id}){
    id
    name
    nip
    addresses{
      id
      name
      address1
      address2
      city
      post_code
    }
    contacts{
      id
      name
      firstName
      lastName
      email
      phone
    }
    orders{
      id
      total
    }
  }
}
`;

export const orders_query = gql`
{
  orders{
    id
    total
    company{
      id
      name
    }
  }
}
`;

export const checkIns_query = gql`
{
    checkIns{
        id
        createAt
    }
}
`;

export const checkOuts_query = gql`
{
    checkOuts{
        id
        createAt
    }
}
`;