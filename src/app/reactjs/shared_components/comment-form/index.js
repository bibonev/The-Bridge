import React from 'react'
import Textarea from 'react-textarea-autosize'

function authorDisplay(author_id, org_u_rows){
        var text = "";
        if(author_id == -1){
                text = "You"
        }else{
            org_u_rows.map(function(org){
                if(author_id == org.id){
                    text = org.title
                }
            });
        }
        return text;
    }

function showAuthorOptions(e){
        e.preventDefault();
        var authorOptions = $(e.target);
        $('.currentOptionsShow:visible:not(.authorOptions)').hide();
        $('.authorOptions').eq(authorOptions.index('.authorDisplay')).toggle();
    }

function onClickAuthorToPost(org_id, updateAuthorId){
        $('.authorOptions').hide();
        updateAuthorId(org_id)
    }

const CommentForm = ({org_u_rows, postId, addCurrentComment, updateAuthorId, author_id}) => {

    const commentAuthorId = author_id || -1;
    const currUserOrg = org_u_rows.map(org => 
            <button onClick={() => onClickAuthorToPost(org.id, updateAuthorId)} key={org.id}>
                {org.title}
            </button>
        )
    const authorDisplayResult = authorDisplay(commentAuthorId, org_u_rows);
    const haveOrganisations = () => {
        if(typeof org_u_rows !== 'undefined' && org_u_rows.length > 0){
            return <div className="commentAuthor">
                    <button className="authorDisplay" onClick={showAuthorOptions}>{authorDisplayResult}</button>
                    <div className="authorOptions currentOptionsShow">
                        <button onClick={() => onClickAuthorToPost(-1, updateAuthorId)}>You</button>
                        <div className="bonusText-authorOptions">Your organisation(s)</div>
                        {currUserOrg}
                    </div>
                </div>
        }else{
            return; 
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            var commentText = $(e.target).val();
            $(e.target).val('');
            var values = {text: commentText}
            addCurrentComment(postId, commentAuthorId, values)
        }
    }

    return  <div className="commentSubmit">
                <div className="commentForm">
                    <Textarea placeholder="Write your comment..." className="commentFormInput" onKeyDown={handleKeyPress}></Textarea>
                </div>
                {haveOrganisations()}
            </div>
}

export default CommentForm;