import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ScrumUser } from '../../models/ScrumUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../services/project/project.service';
import { UserStoryService } from '../../services/userstory/user-story.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Userstory} from '../../models/Userstory';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  project: Project;
  members: ScrumUser[];
  story: Userstory;
  public editUserStoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    storyPoints: new FormControl('', [Validators.required, Validators.min(1)]),
    owner: new FormControl('', [Validators.required])
  });
  private projectSubscription: Subscription;

  constructor(private _snackbar: MatSnackBar, private _dialog: MatDialog, private _project: ProjectService, private _userStory: UserStoryService, private _route: ActivatedRoute, private _userStories: UserStoryService) {
    this.projectSubscription = this._route.params.subscribe((params) => {
      this._project.getProjectsCombined().subscribe((projects) => {
        this.project = projects.find((proj) => proj.id === params.project);

        const userStorySub = this._userStories.getUserStories$(this.project.id).subscribe((userstories) => {
          const story = userstories.find(x => x.id === params.backlog);
          this.story = story;
          this.editUserStoryForm.get('name').setValue(story.name);
          this.editUserStoryForm.get('description').setValue(story.description);
          this.editUserStoryForm.get('storyPoints').setValue(story.storyPoints);
          this.editUserStoryForm.get('owner').setValue(story.owner.id);
        });
      });
    });
  }

  ngOnInit(): void {
  }


  async editUserStory(data: FormData) {
    try {
      await this._userStory.editUserStory(this.project.id, this.story, data);
      this._snackbar.open('Successfully updated user story.', 'Close');
    } catch (e) {
      this._snackbar.open('Failed updating user story','Close');
    }
  }

  async archiveStory(archive: boolean = true) {
    try{
      await this._userStories.archiveUserStory(this.project.id, this.story, archive);
      this._snackbar.open('Successfully archived user story.', 'Close');
    }
    catch (e) {
      console.error(e);
      this._snackbar.open('Failed archiving user story.', 'Close');
    }
  }
}
