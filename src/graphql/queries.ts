import gql from "graphql-tag";

/**
 * Query: Get list of users
 */
export const USERS_SELECT_QUERY = gql`
  query UsersSelect($filter: UserFilter!, $sorting: [UserSort!], $paging: OffsetPaging!) {
    users(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;

/**
 * Query: Get list of task stages
 */
export const TASK_STAGES_SELECT_QUERY = gql`
  query TaskStagesSelect($filter: TaskStageFilter!, $sorting: [TaskStageSort!], $paging: OffsetPaging!) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;

/**
 * Query: Get company contacts
 */
export const COMPANY_CONTACTS_TABLE_QUERY = gql`
  query CompanyContactsTable($filter: ContactFilter!, $sorting: [ContactSort!], $paging: OffsetPaging!) {
    contacts(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        jobTitle
        email
        phone
        status
      }
    }
  }
`;

/**
 * Query: Get companies list
 */
export const COMPANIES_LIST_QUERY = gql`
  query CompaniesList($filter: CompanyFilter!, $sorting: [CompanySort!], $paging: OffsetPaging!) {
    companies(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        dealsAggregate {
          sum {
            value
          }
        }
      }
    }
  }
`;

/**
 * Query: Dashboard Deals Chart
 */
export const DASHBOARD_DEALS_CHART_QUERY = gql`
  query DashboardDealsChart($filter: DealStageFilter!, $sorting: [DealStageSort!], $paging: OffsetPaging) {
    dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
    }
  }
`;

/**
 * Query: Dashboard Latest Deals Activities
 */
export const DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY = gql`
  query DashboardLatestActivitiesDeals($filter: DealFilter!, $sorting: [DealSort!], $paging: OffsetPaging) {
    deals(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        createdAt
        stage {
          id
          title
        }
        company {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

/**
 * Query: Dashboard Latest Audit Activities
 */
export const DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY = gql`
  query DashboardLatestActivitiesAudits($filter: AuditFilter!, $sorting: [AuditSort!], $paging: OffsetPaging) {
    audits(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        action
        targetEntity
        targetId
        createdAt
        changes {
          field
          from
          to
        }
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

/**
 * Query: Dashboard Calendar Upcoming Events
 */
export const DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY = gql`
  query DashboardCalendarUpcomingEvents(
    $filter: EventFilter!, 
    $sorting: [EventSort!], 
    $paging: OffsetPaging!) {
      
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

/**
 * Query: Dashboard Total Counts
 */
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    companies {
      totalCount
    }
    contacts {
      totalCount
    }
    deals {
      totalCount
    }
  }
`;

/**
 * Query: Task Stages
 */
export const TASK_STAGES_QUERY = gql`
  query TaskStages($filter: TaskStageFilter!, $sorting: [TaskStageSort!], $paging: OffsetPaging!) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;

/**
 * Query: Tasks
 */
export const TASKS_QUERY = gql`
  query Tasks($filter: TaskFilter!, $sorting: [TaskSort!], $paging: OffsetPaging!) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        description
        dueDate
        completed
        stageId
        createdAt
        updatedAt
        users {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;
