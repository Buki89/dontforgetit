export const formatDeadline =(created: number, deadline: number): string  => {
   const result = (deadline - created) /1000 / 3600;
    if(deadline > 0){
       return  result > 0 ? `${Math.round(result)} hours left` : 'overdue'
    }
    return ''
}