# BookComet

This project was developed as a code challenge requirement, as proposed in https://github.com/kgfelix/book-comet-coding-challenge/blob/main/front-end-challenge.md

## Goals

The goals of this project are to assess the candidate's technical skills using Angular and Typescript as a development tool for creating single page applications.
The project was developed using Angular CLI 13.2.5.

## Technical Decisions

At the time of the implementation, the provided API was blocking CORS requests, in order to circumvent this problem, an IComet interface was created, that provides the implementation details for the API services (CometIntegrationService and CometStorageService).
Both classes implement the IComet interface, the first, directly calls the API, whislst the second mocks the API calls and stores the results in the local storage.

The project also has a mock 'login' screen, that accepts login attempts from a white-listed collection of users.
Books can be included, edited or removed from the library list, which is maintained by the selected implementation of the IComet interface.
A Book's authors are presented using the AuthorsPipe implementation, that joins the list into a string separated by commas.
The NetworkInterceptor was created to add request headers to any outgoing requests from the application.

Simple unit tests are provided, to test the AuthenticationService, AuthorsPipe, and some of the components used in the project.

## Project Organization

The project is organized as follows

* Core -- Holds the components, services, pipes and interceptors used in the core 'authentication' concept of the project.
* Library -- holds the components and services that correspond to the library section of the project, eg. handling and maintaining books, etc.
