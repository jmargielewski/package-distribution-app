import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import {
  checkPlural,
  priceFormatter,
  countPrice,
  countCancellationDate,
} from '../../helper';

const PackageModal = ({
  modal,
  closeModal,
  selectedPackage,
  activeTeam,
  addPackageToTeam,
}) => (
  <Modal basic open={modal} onClose={closeModal}>
    <Modal.Header>
      Add-
      {selectedPackage.name}
      -Package to the
      {activeTeam.team_name}
      -team
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>{`Price for this month: ${countPrice(selectedPackage.price)}`}</p>
        <p>
          {`Price for the next month: ${priceFormatter.format(selectedPackage.price)}`}
        </p>
        <p>
          {`Commitment period: ${selectedPackage.commitmentPeriod} month${checkPlural(
            selectedPackage.commitmentPeriod,
          )}`}
        </p>
        <p>
          {`Cancellation available from: ${countCancellationDate(
            selectedPackage.commitmentPeriod,
          )}`}
        </p>
        <p>{`Days: ${selectedPackage.days}`}</p>
        <p>{`Credits: ${selectedPackage.mrCredits}`}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button
        color="green"
        inverted
        onClick={() => {
          closeModal();
          addPackageToTeam(selectedPackage, activeTeam.teamId);
        }}
      >
        <Icon name="check" />
        Confirm
      </Button>
      <Button color="red" inverted onClick={closeModal}>
        <Icon name="remove" />
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

export default PackageModal;
