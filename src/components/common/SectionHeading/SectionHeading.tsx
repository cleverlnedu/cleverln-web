import styles from "./SectionHeading.module.css";

interface Props{

title:string;

}

export default function SectionHeading({

title

}:Props){

return(

<h2 className={styles.heading}>

{title}

</h2>

)

}