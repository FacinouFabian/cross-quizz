/* eslint-disable prettier/prettier */
import { gql } from 'graphql-request'

const homepage = gql`
  query {
    shootings(publicationState: PREVIEW) {
      position
      side
      layer
      media {
        caption
        url
        width
        height
        mime
      }
    }
  }
`

const diary = gql`
  query {
    diaries(publicationState: PREVIEW) {
      id
      photo {
        url
        caption
      }
    }
  }
`

const projects = gql`
  query {
    projects {
      id
      title
      slug
      template
    }
  }
`

const project = gql`
  query($project: String!) {
    projects(where: { slug: $project }, publicationState: PREVIEW) {
      id
      title
      template
      description
      photos {
        caption
        url
      }
    }
  }
`

const queries = (): { [key: string]: string } => ({ homepage, diary, projects, project })

export default queries
