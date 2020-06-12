import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectService} from '../../services/project/project.service';
import {ScrumUser} from '../../models/ScrumUser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] =[];
  archivedProjects: Project[] = [];
  projectsSubscription: Subscription;
  displayedColumns: string[] = ['name', 'description', 'owner', 'status', 'open'];
  displayedArchivedColumns: string[] = ['name', 'description', 'owner', 'status', 'unarchive'];
  constructor(private _projects: ProjectService, private _toast: MatSnackBar ) { }

  ngOnInit(): void {
    this.projectsSubscription = this._projects.getProjects$().subscribe((projects) => {
      this.archivedProjects = projects.filter((proj) => proj.archived === true);
      this.projects = projects.filter((proj) => proj.archived === false);
    });
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }

  async archive(element: Project, archive: boolean = true) {
    const updatedText = archive ? 'archive' : 'de-archive';
    try{
      await this._projects.archiveProject(element.id, archive);
      this._toast.open(`The projects has been ${updatedText}d`, 'Ok');
    }
    catch(e){
      console.error(e);
      this._toast.open(`There has been an error ${updatedText}ing the project`, 'Close');
    }
  }
}
