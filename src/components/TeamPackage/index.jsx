import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { checkPlural } from '../../helper';

const TeamPackage = ({
  activePackage,
  startDate,
  endDate,
  teamPackageId,
  isCancellationAvailable,
  cancellationDate,
  handleCancelPackage,
}) => (
  <Card>
    <Card.Content>
      <Card.Header className="team__header">{activePackage.name}</Card.Header>
    </Card.Content>
    <Card.Content className="team__meta">
      <Card.Meta>
        Start date:
        {startDate}
      </Card.Meta>
      {endDate && (
        <Card.Meta>
          End date:
          {endDate}
        </Card.Meta>
      )}

      <Card.Meta>
        Commitment period:
        {activePackage.commitmentPeriod}
        month
        {checkPlural(activePackage.commitmentPeriod)}
      </Card.Meta>
      <Card.Meta>
        Cancellation period:
        {activePackage.concellationPeriod}
        month
        {checkPlural(activePackage.commitmentPeriod)}
      </Card.Meta>
      <Card.Meta>
        Cancellation available from:
        {cancellationDate}
      </Card.Meta>
    </Card.Content>
    {!endDate && (
      <Button
        color="red"
        disabled={!isCancellationAvailable}
        className="team__button"
        onClick={() => handleCancelPackage(teamPackageId, activePackage.concellationPeriod)}
      >
        Cancel Package
      </Button>
    )}
  </Card>
);

export default TeamPackage;
