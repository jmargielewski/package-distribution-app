import React from 'react';
import { Card, Popup, Button } from 'semantic-ui-react';
import { checkPlural, priceFormatter } from '../../helper';

const Package = ({
 _package, activeTeam, handleSelectPackage, isPackageAvailabe 
}) => {
  const trigger = (
    <span>
      <Button
        attached="bottom"
        color="green"
        disabled={!activeTeam || isPackageAvailabe(_package)}
        onClick={() => handleSelectPackage(_package)}
      >
        Buy The Package
      </Button>
    </span>
  );

  return (
    <Card link>
      <Card.Content>
        <Card.Header>{_package.name}</Card.Header>
        <Card.Description>{_package.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Meta>
          Concellation Period:
          {_package.concellationPeriod}
          month
          {checkPlural(_package.concellationPeriod)}
        </Card.Meta>
        <Card.Meta>
          Commitment Period:
          {_package.commitmentPeriod}
          month
          {checkPlural(_package.commitmentPeriod)}
        </Card.Meta>
        <Card.Meta>
          Price:
          {priceFormatter.format(_package.price)}
        </Card.Meta>
        <Card.Meta>
          Credits:
          {_package.mrCredits}
        </Card.Meta>
        <Card.Meta>
          Days:
          {_package.days}
        </Card.Meta>
      </Card.Content>

      <Popup
        content="Please choose a team first."
        disabled={!!activeTeam}
        on="hover"
        trigger={trigger}
      />
    </Card>
  );
};

export default Package;
