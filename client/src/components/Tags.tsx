import React from 'react';

interface TagsProps { //this component represents the tags below the content of the ticket
    tags: Array<string> | undefined;
}

const Tags: React.FC<TagsProps> = ({ tags }) => {

    return <span style={{float:'right'}}>
        {tags && tags.map(s => (<span key={s} style={{
            backgroundColor: '#ddeffb',
            borderWidth:'2.5px',
            borderStyle: 'solid',
            borderColor: '#c9dff4',
            borderRadius: '10%',
            margin: '3px',
            padding: '2px',
            color: '#31455e',
            fontSize: '13px',
            fontWeight: 550,
        }}>{s}</span>))}
    </span>
};

export default Tags;