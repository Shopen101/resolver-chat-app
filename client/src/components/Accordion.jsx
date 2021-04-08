import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CircLoader } from '../components'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function ControlledAccordions({ accordionData }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {accordionData ?
                accordionData.map((accordionItem, index) => {
                    return (
                        <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={`${accordionItem}___${index}`} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panelbh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{accordionItem.header}</Typography>
                                <Typography className={classes.secondaryHeading}>{accordionItem.tags.join(', ')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {accordionItem.text}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
                : <CircLoader />
            }
        </div>
    );
}

export default ControlledAccordions