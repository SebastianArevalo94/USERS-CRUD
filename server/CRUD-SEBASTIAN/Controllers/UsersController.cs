using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD_SEBASTIAN.Models;
using CRUD_SEBASTIAN.Context;
using Microsoft.AspNetCore.Cors;

namespace CRUD_SEBASTIAN.Controllers
{
    [EnableCors("corsRules")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly CRUDContext _crudContext;

        public UsersController(CRUDContext _context)
        {
            _crudContext = _context;
        }

        //GET ALL USERS:
        [HttpGet]
        [Route("List")]
        public ActionResult GetAllUsers()
        {
            List<Usuario> allUsers = new List<Usuario>();
            try
            {
                allUsers = _crudContext.Usuarios.ToList();
                return StatusCode(StatusCodes.Status200OK, new { message = "GET ALL USERS SUCCESS", response = allUsers });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //GET ONE USER BY ID:
        [HttpGet]
        [Route("GetOne/{idUser:int}")]

        public ActionResult GetOneUser(int userId)
        {
            Usuario? user = _crudContext.Usuarios.Find(userId);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }
            try
            {
                return StatusCode(StatusCodes.Status200OK, new { message = "GET ONE USER SUCCESS", response = user });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //POST - SAVE USER
        [HttpPost]
        [Route("SaveUser")]

        public ActionResult SaveUser([FromBody] Usuario obj)
        {
            try
            {
                _crudContext.Usuarios.Add(obj);
                _crudContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { message = "The user has been saved :)" });

            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PUT - EDIT USER 
        [HttpPut]
        [Route("EditUser")]

        public ActionResult EditUser([FromBody] Usuario obj)
        {
            Usuario? user = _crudContext.Usuarios.Find(obj.UserId);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }
            try
            {
                user.Nombre = obj.Nombre is null ? user.Nombre : obj.Nombre;
                user.Email = obj.Nombre is null ? user.Email : obj.Email;
                _crudContext.Usuarios.Update(user);
                _crudContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "The user has been updated :)" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //DELETE USER
        [HttpDelete]
        [Route("DeleteUser/{userId:int}")]
        
        public ActionResult DeleteUser(int userId)
        {
            Usuario? user = _crudContext.Usuarios.Find(userId);
            if(user == null)
            {
                return BadRequest("User Not Found");
            }
            try
            {
                _crudContext.Usuarios.Remove(user);
                _crudContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "The user has been removed :)" });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
