import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { generatePdf } from '@department-of-veterans-affairs/platform-pdf/exports';
import moment from 'moment';
import { focusElement } from '@department-of-veterans-affairs/platform-utilities/ui';
import { dateFormat, processList } from '../util/helpers';
import ItemList from '../components/shared/ItemList';
import { getConditionDetails } from '../actions/conditions';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import PrintHeader from '../components/shared/PrintHeader';
import PrintDownload from '../components/shared/PrintDownload';
import { updatePageTitle } from '../../shared/util/helpers';
import { pageTitles } from '../util/constants';

const ConditionDetails = () => {
  const condition = useSelector(state => state.mr.conditions.conditionDetails);
  const { conditionId } = useParams();
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (conditionId) dispatch(getConditionDetails(conditionId));
    },
    [conditionId, dispatch],
  );
  const formattedDate = dateFormat(condition?.date, 'MMMM D, YYYY [at] h:mm z');

  useEffect(
    () => {
      if (condition?.name) {
        dispatch(
          setBreadcrumbs(
            [
              {
                url: '/my-health/medical-records/conditions',
                label: 'Conditions',
              },
            ],
            {
              url: `/my-health/medical-records/conditions/${conditionId}`,
              label: condition?.name,
            },
          ),
        );
        focusElement(document.querySelector('h1'));
        const titleDate = formattedDate ? `${formattedDate} - ` : '';
        updatePageTitle(
          `${titleDate}${condition.name} - ${
            pageTitles.HEALTH_CONDITIONS_PAGE_TITLE
          }`,
        );
      }
    },
    [condition],
  );

  const generateConditionDetails = async () => {
    const pdfData = {
      headerLeft: 'Roberts, Jesse',
      headerRight: 'Date of birth: January 1, 1970',
      footerLeft: `Report generated by My HealtheVet and VA on ${moment().format(
        'LL',
      )}`,
      footerRight: 'Page %PAGE_NUMBER% of %TOTAL_PAGES%',
      title: `Conditions: ${condition.name} on ${formattedDate}`,
      subject: 'VA Medical Record',
      preface:
        'Your VA conditions list may not be complete. If you have any questions about your information, visit the FAQs or contact your VA Health care team.',
      results: {
        items: [
          {
            items: [
              {
                title: 'Date',
                value: moment(condition.date).format('MMMM Do YYYY') || ' ',
                inline: true,
              },
              {
                title: 'Provider',
                value: condition.provider || ' ',
                inline: true,
              },
              {
                title: 'Provider Notes',
                value: condition.comments.length
                  ? processList(condition.comments)
                  : 'none noted',
                inline: !condition.comments.length,
              },
              {
                title: 'Status of health condition',
                value: condition.active ? 'active' : 'inactive',
                inline: true,
              },
              {
                title: 'Location',
                value: condition.facility || ' ',
                inline: true,
              },
              {
                title: 'SNOMED Clinical term',
                value: condition.name || ' ',
                inline: true,
              },
            ],
          },
        ],
      },
    };

    try {
      await generatePdf('medicalRecords', 'conditions_report', pdfData);
    } catch (error) {
      // Error logging/presentation goes here...
    }
  };

  const download = () => {
    generateConditionDetails();
  };

  const content = () => {
    if (condition) {
      return (
        <>
          <PrintHeader />
          <h1
            className="vads-u-margin-bottom--0"
            aria-describedby="condition-date"
          >
            {condition.name.split(' (')[0]}
          </h1>
          <section className="set-width-486">
            <div className="condition-subheader vads-u-margin-bottom--3">
              <div className="time-header">
                <h2
                  className="vads-u-font-size--base vads-u-font-family--sans"
                  id="condition-date"
                >
                  Date entered:{' '}
                  <span className="vads-u-font-weight--normal">
                    {formattedDate}
                  </span>
                </h2>
              </div>
              <PrintDownload list download={download} />
            </div>
            <div className="condition-details max-80">
              <h2 className="vads-u-font-size--base vads-u-font-family--sans">
                Status of health condition
              </h2>
              <p>{condition.active ? 'Active' : 'Inactive'}</p>
              <h2 className="vads-u-font-size--base vads-u-font-family--sans">
                Provider
              </h2>
              <p>{condition.provider}</p>
              <h2 className="vads-u-font-size--base vads-u-font-family--sans">
                Location
              </h2>
              <p>
                {condition.facility ||
                  'There is no facility reported at this time'}
              </p>
              <h2 className="vads-u-font-size--base vads-u-font-family--sans">
                SNOMED Clinical term
              </h2>
              <p>{condition.name}</p>
              <h2 className="vads-u-margin-bottom--0">Provider notes</h2>
              <ItemList list={condition.comments} />
            </div>
          </section>
        </>
      );
    }

    return (
      <va-loading-indicator
        message="Loading..."
        setFocus
        data-testid="loading-indicator"
        class="loading-indicator"
      />
    );
  };

  return (
    <div className="vads-l-grid-container vads-u-padding-x--0 vads-u-margin-bottom--5">
      {content()}
    </div>
  );
};

export default ConditionDetails;

ConditionDetails.propTypes = {
  print: PropTypes.func,
};
