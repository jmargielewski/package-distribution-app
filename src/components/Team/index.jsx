import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react';

const Team = ({
 team, activeTeam, handleActiveTeam, renderTeamPackages 
}) => (
  <Card
    link
    onClick={() => handleActiveTeam(team)}
    className={activeTeam && activeTeam.teamId === team.teamId ? 'team--active' : ''}
  >
    <Card.Content>
      <Card.Header>
        {team.team_name}
        {activeTeam && activeTeam.teamId === team.teamId && (
          <Icon
            style={{ float: 'right' }}
            size="large"
            name="check circle outline"
            color="blue"
          />
        )}
      </Card.Header>
      <Divider />
      <Card.Group itemsPerRow={2} centered>
        {renderTeamPackages(team.teamId)}
      </Card.Group>
    </Card.Content>
  </Card>
);

export default Team;
