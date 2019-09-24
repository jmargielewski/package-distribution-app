import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
 Icon, Container, Header, Card, Divider 
} from 'semantic-ui-react';

// actions
import {
  fetchTeamPackages,
  addPackageToTeam,
  cancelTeamPackage,
} from '../../store/teamPackages/actions';
import { fetchTeams } from '../../store/teams/actions';
import { fetchPackages } from '../../store/packages/actions';

// selectors
import { getTeams, getPackages, getTeamPackages } from '../../store/selectors';

// components
import Team from '../Team';
import Modal from '../Modal';
import Loader from '../Loader';
import Package from '../Package';
import TeamPackage from '../TeamPackage';

import { countCancellationDate, countEndDate } from '../../helper';

// styles
import './style.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  state = {
    activeTeam: null,
    selectedPackage: null,
    modal: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.fetchTeams();
    this.props.fetchPackages();
    this.props.fetchTeamPackages();
  };

  closeModal = () => this.setState({ modal: false, selectedPackage: null });

  handleActiveTeam = (activeTeam) => this.setState({ activeTeam });

  handleSelectPackage = (_package) => {
    this.setState({
      modal: true,
      selectedPackage: _package,
    });
  };

  handleCancelPackage = (teamPackageId, cancellationDate) => {
    const endDate = countEndDate(cancellationDate);
    this.props.cancelTeamPackage(teamPackageId, endDate);
  };

  isPackageAvailabe = (_package) => {
    const { teamPackages } = this.props;
    const { packageId, sellLimit } = _package;
    if (!sellLimit) return false;

    return !teamPackages.reduce((acc, teamPackage) => {
      teamPackage.packageId === packageId && (acc -= 1);
      return acc;
    }, sellLimit);
  };

  renderTeams = (teams) => (teams.length > 0 ? (
      teams.map(team => (
        <Team
          key={team.teamId}
          team={team}
          activeTeam={this.state.activeTeam}
          handleActiveTeam={this.handleActiveTeam}
          renderTeamPackages={this.renderTeamPackages}
        />
      ))
    ) : (
      <Loader />
    ));

  renderPackages = (packages) => (packages.length > 0 ? (
      packages.map(_package => (
        <Package
          key={_package.packageId}
          _package={_package}
          activeTeam={this.state.activeTeam}
          isPackageAvailabe={this.isPackageAvailabe}
          handleSelectPackage={this.handleSelectPackage}
        />
      ))
    ) : (
      <Loader />
    ));

  renderTeamPackages = (teamId) => {
    const { teamPackages, packages } = this.props;

    if (teamPackages.length > 0 && packages.length > 0) {
      const currentTeamPackages = teamPackages.filter(
        (teamPackage) => teamPackage.teamId === teamId,
      );

      const activePackages = packages.filter(
        ({ packageId }) => currentTeamPackages
            .map((currentTeamPackage) => currentTeamPackage.packageId)
            .indexOf(packageId) !== -1,
      );

      return activePackages.map((activePackage, i) => {
        const cancellationDate = countCancellationDate(
          activePackage.commitmentPeriod,
          currentTeamPackages[i].startDate,
        );

        const isCancellationAvailable = moment().isAfter(Date.parse(cancellationDate));

        return (
          <TeamPackage
            key={activePackage.packageId}
            startDate={currentTeamPackages[i].startDate}
            endDate={currentTeamPackages[i].endDate}
            teamPackageId={currentTeamPackages[i].teamPackageId}
            activePackage={activePackage}
            cancellationDate={cancellationDate}
            handleCancelPackage={this.handleCancelPackage}
            isCancellationAvailable={isCancellationAvailable}
          />
        );
      });
    }
    return <Loader />;
  };

  render() {
    const { teams, packages, addPackageToTeam } = this.props;
    const { modal, activeTeam, selectedPackage } = this.state;

    return (
      <Container>
        <Header as="h2">
          <Icon name="users" />
          TEAMS
        </Header>
        <Divider />
        <Card.Group itemsPerRow={3} centered>
          {this.renderTeams(teams)}
        </Card.Group>

        <Header as="h2">
          <Icon name="cube" />
          PACKAGES
        </Header>
        <Divider />
        <Card.Group itemsPerRow={4} centered>
          {this.renderPackages(packages)}
        </Card.Group>

        {modal && (
          <Modal
            modal={modal}
            closeModal={this.closeModal}
            selectedPackage={selectedPackage}
            activeTeam={activeTeam}
            addPackageToTeam={addPackageToTeam}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: getTeams(state),
  packages: getPackages(state),
  teamPackages: getTeamPackages(state),
});

export default connect(
  mapStateToProps,
  {
    fetchTeams,
    fetchPackages,
    fetchTeamPackages,
    addPackageToTeam,
    cancelTeamPackage,
  },
)(App);
