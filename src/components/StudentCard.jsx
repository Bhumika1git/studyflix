// function StudentCard({ student }) {
//   return (
//     <div className="teammatch-main-card">

//       <div className="teammatch-card-top">
//         <span className="teammatch-online">
//           ● Online
//         </span>
//       </div>

//       <div className="teammatch-avatar">
//         {student.name.charAt(0)}
//       </div>

//       <h3 className="teammatch-student-name">
//         {student.name}
//       </h3>

//       <p className="teammatch-student-info">
//         {student.course} • {student.year} • {student.university}
//       </p>

//       <div className="teammatch-skills">
//         {student.skills.map((skill) => (
//           <span key={skill}>{skill}</span>
//         ))}
//       </div>

//       <div className="teammatch-preferences">

//         <p>
//           🌙 Night Owl: <strong>{student.nightOwl}</strong>
//         </p>

//         <p>
//           👥 Group Study: <strong>{student.groupStudy}</strong>
//         </p>

//         <p>
//           📷 Camera: <strong>{student.camera}</strong>
//         </p>

//       </div>

//       <div className="teammatch-looking-for">

//         <span>LOOKING FOR</span>

//         <p>{student.lookingFor}</p>

//       </div>

//     </div>
//   );
// }

// export default StudentCard;

function StudentCard({ student }) {
  return (
    <div className="teammatch-main-card">

      <div className="teammatch-card-top">
        <span className="teammatch-online">
          ● Online
        </span>
      </div>

      <div className="teammatch-avatar">
        {student.name.charAt(0)}
      </div>

      <h3 className="teammatch-student-name">
        {student.name}
      </h3>

      <p className="teammatch-student-info">
        {student.course} • {student.year} • {student.university}
      </p>


      {/* BIO */}
      <p className="teammatch-student-bio">
        {student.bio}
      </p>


      {/* SKILLS */}
      <div className="teammatch-skills-section">

        <span className="teammatch-small-label">
          SKILLS
        </span>

        <div className="teammatch-skills">
          {student.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

      </div>


      {/* STUDY GOAL */}
      <div className="teammatch-study-goal">

        <span>🎯 STUDY GOAL</span>

        <p>{student.studyGoal}</p>

      </div>
      
      <div className="teammatch-study-style">
  <span>📚 STUDY STYLE</span>
  <p>{student.studyStyle}</p>
    </div>

      {/* PREFERENCES */}
      <div className="teammatch-preferences">

        <p>
          🌙 Night Owl:
          <strong> {student.nightOwl}</strong>
        </p>

        <p>
          👥 Group Study:
          <strong> {student.groupStudy}</strong>
        </p>

        <p>
          📷 Camera:
          <strong> {student.camera}</strong>
        </p>

      </div>


      {/* LOOKING FOR */}
      <div className="teammatch-looking-for">

        <span>LOOKING FOR</span>

        <p>{student.lookingFor}</p>

      </div>

    </div>
  );
}

export default StudentCard;