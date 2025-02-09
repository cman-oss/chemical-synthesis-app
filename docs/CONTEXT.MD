# AI Chemical Synthesis App
> Feature Overview & User Flow Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [User Flow](#user-flow)
3. [Features & Functionalities](#features--functionalities)
4. [Technical Considerations](#technical-considerations)
5. [Future Enhancements](#future-enhancements)

## Introduction
The AI Chemical Synthesis App is designed to assist users in predicting synthesis pathways for chemicals. It allows users to create projects, input chemical details, and leverage AI to generate synthesis pathways. Different subscription tiers provide varying levels of access to project creation and deletion options.

## User Flow

### Welcome Screen
Users are greeted with a clean, informative welcome screen offering two primary actions:
- **Get Started** → Directs to pricing page
- **Login/Sign-Up** → Initiates Gmail authentication

### Subscription Plans

| Plan     | Price/Month | Project Limit | Deletion Rights |
|----------|-------------|---------------|-----------------|
| Free     | $0         | 3             | No              |
| Basic    | $10        | 10            | No              |
| Pro      | $30        | 20            | No              |
| Premium  | $40        | 30            | Yes             |

### Authentication
- Gmail-based authentication only
- Automatic redirect to home page after successful login

### Project Management
#### Creation
- Create new projects (within plan limits)
- Assign project titles
- View existing projects dashboard

#### Chemical Synthesis
- Input target chemical compounds
- Generate AI-powered synthesis pathways
- View detailed synthesis steps

#### Project Limitations
- **Free/Basic/Pro Plans**: No project deletion
- **Premium Plan**: Full project management including deletion
- Project limits enforced based on subscription tier

## Features & Functionalities

- **Authentication**
  - Secure Google OAuth integration
  - Seamless login/signup flow

- **Project System**
  - Tiered project limits
  - Persistent data storage
  - Plan-based management restrictions

- **AI Integration**
  - Automated synthesis pathway generation
  - Chemical compound analysis
  - Prediction optimization

- **Subscription Management**
  - Tier-based access control
  - Automated limit enforcement
  - Upgrade pathways

## Technical Considerations

### Frontend
- React.js/Vue.js
- Responsive design
- Interactive UI components

### Backend
- Node.js/Django
- RESTful API architecture
- Authentication handling
- AI model integration (askcos from mit)

### Database Schema

#### Collections/Tables

1. **Users**
   ```json
   {
     "uid": "string (primary key)",
     "email": "string",
     "displayName": "string",
     "subscriptionTier": "string (free|basic|pro|premium)",
     "subscriptionStatus": "string (active|inactive)",
     "createdAt": "timestamp",
     "lastLogin": "timestamp",
     "projectCount": "number"
   }
   ```

2. **Projects**
   ```json
   {
     "projectId": "string (primary key)",
     "userId": "string (foreign key)",
     "title": "string",
     "description": "string",
     "targetCompound": "string",
     "status": "string (active|archived)",
     "createdAt": "timestamp",
     "updatedAt": "timestamp"
   }
   ```

3. **SynthesisPathways**
   ```json
   {
     "pathwayId": "string (primary key)",
     "projectId": "string (foreign key)",
     "steps": "array",
     "confidence": "number",
     "generatedAt": "timestamp",
     "status": "string (pending|complete|failed)"
   }
   ```

4. **Subscriptions**
   ```json
   {
     "subscriptionId": "string (primary key)",
     "userId": "string (foreign key)",
     "tier": "string",
     "startDate": "timestamp",
     "endDate": "timestamp",
     "paymentStatus": "string",
     "stripeCustomerId": "string"
   }
   ```

### Project Structure

## Future Enhancements

### Planned Features
1. **Collaboration Tools**
   - Multi-user project access
   - Real-time updates
   - Role-based permissions

2. **Export Options**
   - PDF synthesis reports
   - Data export functionality
   - Batch processing

3. **AI Improvements**
   - Enhanced prediction accuracy
   - Deep learning integration
   - User feedback incorporation

4. **User Experience**
   - Pathway optimization suggestions
   - Interactive visualization tools
   - Custom reporting options
