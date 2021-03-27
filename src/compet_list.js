const Compet_list = ({competition_details}) => {
    return ( 
        competition_details.forEach(element => {
            <option value={element.price} >{element.competition_name}</option>
        })
     );
}
 
export default Compet_list;