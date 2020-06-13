import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ScrumUser } from '../../models/ScrumUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../services/project/project.service';
import { UserstoryService } from '../../services/userstory/userstory.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  project: Project;
  members: ScrumUser[];
  public addUserStoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required])
  });
  private projectSubscription: Subscription;

  constructor(private _snackbar: MatSnackBar, private _dialog: MatDialog, private _project: ProjectService, private _userStory: UserstoryService, private _route: ActivatedRoute, private _userStories: UserstoryService) {
    this.projectSubscription = this._route.params.subscribe((params) => {
      this._project.getProjectsCombined().subscribe((projects) => {
        this.project = projects.find((proj) => proj.id === params.project);

        const userStorySub = this._userStories.getUserStories$(this.project).subscribe((userstories) => {
          const story = userstories.find(x => x.id == params.backlog);

          this.addUserStoryForm.get('name').setValue(story.name);
          this.addUserStoryForm.get('description').setValue(story.description);
          this.addUserStoryForm.get('owner').setValue(story.owner);

        });



      });
    });
  }

  ngOnInit(): void {
  }


  async createUserstory(data: FormData) {
    try {
      await this._userStory.createUserStory(this.project, data);
      this._snackbar.open('Successfully created user story.');
    } catch (e) {
      this._snackbar.open('Failed creating user story');
    }
  }
}
